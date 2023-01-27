from flask import Blueprint, jsonify, request, render_template, redirect
from flask_login import login_required, current_user
from app.models import db, User, Product, Image
from app.forms import ProductForm, ImageForm
from datetime import datetime 
from .auth_routes import validation_errors_to_error_messages


product_router = Blueprint('products', __name__)


@product_router.route("/")
def get_all_products():
  products = Product.query.all()

  products_result = [] # array of objects 

  if products is not None:
    # product = [product.to_dict() for product in products]
    for product in products:
      product = product.to_dict()
      # print('product-------------------\n', product)
      preview_img = db.session.query(Image).filter(Image.product_id == product["id"]).first()
      # print('preview_img--------\n', preview_img)
      
      if preview_img is not None:
        product["previewImage"] = preview_img.url

      product['price'] = str(product['price'])

      products_result.append(product)
      print('product_result-----------------\n', products_result)

    return jsonify({"Products": products_result}), 200






@product_router.route("/current")
@login_required
def get_my_products():

  user_id = current_user.id
  products = Product.query.filter(Product.seller_id == user_id).all()

  products_result = []

  if products is not None:
    for product in products:
      product = product.to_dict()

      product_id = product["id"]
      preview_img = db.session.query(Image).filter(Image.product_id == product_id).first()
      if preview_img is not None:
        product["previewImage"] = preview_img.url

      product['price'] = str(product['price'])

      products_result.append(product)

    return jsonify({"Products": products_result}), 200







@product_router.route("", methods=["POST"])
@login_required
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
#   data = Product.query.filter(Product.category.like('%valentine%')).all()
#   print('data ------------ \n', data)
#   return render_template('form_data.html', data=data)






@product_router.route("/<int:product_id>")
def get_one_product(product_id):
  product = Product.query.get(product_id)
  # reviews = Review.query.filter(Review.product_id == product_id).all()
  images = Image.query.filter(Image.product_id == product_id).all()

  if product:
    user_id = product.seller_id
    seller = User.query.get(user_id)

    product_details = []
    product = product.to_dict()
    decimal_price = product["price"]
    str_price = str(round(decimal_price, 2))
    product["price"] = str_price
    product["productImages"] = [image.url for image in images]
    product["seller"] = seller.username
    product_details.append(product)

    return jsonify(product_details)
  else:
    return {"error": "Product couldn't be found", "statusCode": 404}








@product_router.route("/<int:product_id>/images", methods=["POST"])
@login_required
def add_product_image(product_id):
  """
  logged in user can add images to their product listing
  """
  product = Product.query.get(product_id)
  form = ImageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if product is None:
    return {"errors" : "Product couldn't be found"}, 404
  if product.seller_id != current_user.id:
    return {"errors" : "You are not the seller of this product"}, 403
  if form.validate_on_submit():
    new_image = Image(
      url=form.data["url"],
      product_id = product_id
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict(), 200
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401








@product_router.route("/<int:product_id>", methods=["PUT"])
@login_required
def update_product(product_id):
    """
    logged in user can edit their product listing
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    edit_product = Product.query.get(product_id)
    if edit_product is None:
      return {"errors" : "Product couldn't be found"}, 404
    if edit_product.seller_id != current_user.id:
      return {"errors" : "You are not the seller of this product"}, 403
    if form.validate_on_submit():
      edit_product = Product.query.get(product_id)
      edit_product.category = form.data['category']
      edit_product.name = form.data['name']
      edit_product.description = form.data['description']
      edit_product.price = form.data['price']
      edit_product.stock = form.data['stock']

      db.session.commit()
      return edit_product.to_dict_search(), 200
    else:
      return {"errors" : validation_errors_to_error_messages(form.errors)}, 400





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


