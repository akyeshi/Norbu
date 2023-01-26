from flask import Blueprint, jsonify, request, render_template, redirect
from flask_login import login_required, current_user
from app.models import db, Product, User 
from app.forms import ProductForm
from datetime import datetime 
from .auth_routes import validation_errors_to_error_messages


product_router = Blueprint('products', __name__)


@product_router.route('/')
def get_all_products(): 
  products = Product.query.all()
  return {
    "products": [product.to_dict() for product in products]
  }



@product_router.route("/new", methods=["GET", "POST"])
# @login_required
def create_product(): 
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit(): 
    data = Product (
      seller_id = current_user.id, 
      name = form.data["name"], 
      category = form.data["category"], 
      description = form.data["description"],
      price = form.data["price"],
      stock = form.data["stock"]
    )
    print(data)
    db.session.add(data)
    db.session.commit()
    # return redirect('/api/products/new')
    return data.to_dict(), 201
  
  else: 
    # return render_template('product_form.html', form=form)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# @product_router.route('/form-data')
# def get_form_data(): 
#   data = Product.query.filter(Product.name.like('mug')).all()
#   print('data ------------ \n', data)
#   return render_template('form_data.html', data=data)






@product_router.route("/<int:product_id>")
def get_one_product(product_id): 
  product = Product.query.get(product_id)
  return product.to_dict()



@product_router.route("/<int:product_id>", methods=["DELETE"])
@login_required
def delete_product(product_id): 
  product = Product.query.get(product_id)
  if product.seller_id == current_user.id: 
    db.session.delete(product)
    db.session.commit()
    return jsonify({
      "message": "Product successfully deleted!", 
      "status_code": 200
    }), 200
  else: 
    return jsonify({
      "errors": "Unauthorized! You are not the owner of the product!"
    }), 403
