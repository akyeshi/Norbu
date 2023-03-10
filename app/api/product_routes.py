from flask import Blueprint, jsonify, request, render_template, redirect
from flask_login import login_required, current_user
from app.models import db, User, Product, Image, Review, CartItem
from app.forms import ProductForm, ImageForm, ReviewForm, CartItemForm
from datetime import datetime 
import random 
from .auth_routes import validation_errors_to_error_messages


product_router = Blueprint('products', __name__)





#------------------- search ---------------------


@product_router.route("/search/<keyword>")
def search_product(keyword): 
  products = Product.query.filter(Product.name.like(f'%{keyword}%')).all()
  return {
    "Products": [
      product.to_dict_search() for product in products
    ]
  }, 200


#------------------- Product cruds ---------------------


# get all products 
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





# get current user products 
@product_router.route("/current")
@login_required
def get_my_products():

  user_id = current_user.id
  products = Product.query.filter(Product.seller_id == user_id).all()

  products_result = []

  if products is not None:
    for product in products:
      product = product.to_dict()

      # product_id = product["id"]
      preview_img = db.session.query(Image).filter(Image.product_id == product["id"]).first()
      if preview_img is not None:
        product["previewImage"] = preview_img.url

      product['price'] = str(product['price'])

      productreviews = Review.query.filter(Review.product_id == product["id"]).all()
      if productreviews: 
        numReviews = len(productreviews)
        total_stars = 0
        for review in productreviews: 
          total_stars += review.to_dict()["stars"]
        avgRating = total_stars / numReviews
        product["avgRating"] = avgRating
      products_result.append(product)

    return jsonify({"Products": products_result}), 200




# post a product 
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
    # print(data)
    db.session.add(data)
    db.session.commit()
    # return redirect('/api/products/new')
    return data.to_dict(), 201
  
  else: 
    # return render_template('product_form.html', form=form)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




# see a product detail page 
@product_router.route("/<int:product_id>")
def get_one_product(product_id):
  product = Product.query.get(product_id)
  reviews = Review.query.filter(Review.product_id == product_id).all()
  images = Image.query.filter(Image.product_id == product_id).all()
  seller = ""
  
  if product:
    user_id = product.seller_id
    seller = User.query.get(user_id)

  if reviews:
    numReviews = len(reviews)
    total_stars = 0
    list_of_reviewers = []
    for review in reviews:
      total_stars += review.to_dict()["stars"]
      list_of_reviewers.append(review.user_id)
    avgRating = total_stars / numReviews

  else:
    numReviews = 0
    avgRating = 0
    list_of_reviewers = []

  if product:
    product_details = []
    product = product.to_dict()
    decimal_price = product["price"]
    str_price = str(round(decimal_price, 2))
    product["price"] = str_price
    product["numReviews"] = numReviews
    product["avgRating"] = avgRating
    product["salesNumber"] = random.randint(1,1000)
    product["productImages"] = [image.url for image in images]
    product["seller"] = seller.username
    product["reviewers"] = list_of_reviewers
    product_details.append(product)

    return jsonify(product_details)
  else:
    return {"error": "Product couldn't be found", "statusCode": 404}



# edit a product info
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



# delete a product 
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




#------------------- product images cruds ---------------------



# post product images 
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




#------------------- product reviews cruds ---------------------


# get all reviews o fa product 
@product_router.route("/<int:product_id>/reviews")
def get_product_reviews(product_id):

  product = Product.query.get(product_id)

  if product is None:
    return {"errors": "Product couldn't be found"}, 404

  filtered_reviews = Review.query.filter(Review.product_id == product_id).all()

  if filtered_reviews is not None:
    return {"Reviews": [review.to_dict()
                        for review in filtered_reviews]}, 200

# fetch("http://localhost:3000/api/products/3/reviews", {
#   method: 'GET',
#   headers: {
#     'Content-type': 'application/json'
#   }
# })
# .then(res => res.json())
# .then(console.log)




# post a review on a product 
@product_router.route("/<int:product_id>/reviews", methods=["POST"])
@login_required
def create_review(product_id):
  form = ReviewForm()
  form["csrf_token"].data = request.cookies["csrf_token"]
  product = Product.query.get(product_id)
  if product is None:
    return {"errors": "Product couldn't be found"}, 404
  if product.seller_id == current_user.id:
    return {"errors": "You can't review your own product"}, 400
  existed_reviews = Review.query.filter(Review.product_id == product_id).all()
  if existed_reviews:
    for review in existed_reviews:
      if review.user_id == current_user.id:
        return {"errors": "You have already left a review for this product"}, 400
  if form.validate_on_submit():
    new_review = Review(
      user_id = current_user.id,
      product_id = product_id,
      review = form.data["review"],
      stars = form.data["stars"],
      created_at = datetime.now()
    )
    db.session.add(new_review)
    db.session.commit()
    return new_review.to_dict(), 201
  else:
    return {"errors": validation_errors_to_error_messages(form.errors)}, 400





#------------------- cart cruds: POST ---------------------


@product_router.route("/<int:product_id>/cart", methods=["POST"])
@login_required
def create_cart_item(product_id):
  print(f"-------111BACKEND STARTS-------product id: {product_id}")

  item = Product.query.get(product_id)
  print(f"-------222BACKEND -------item: {item}")
  print(f"-------222BACKEND -------item.seller_id: {item.seller_id}")
  print(f"-------222BACKEND -------current_user.id: {current_user.id}")

  cartItem = db.session.query(CartItem) \
                            .filter(CartItem.user_id == current_user.id) \
                            .filter(CartItem.product_id == product_id) \
                            .filter(CartItem.order_id == 0)\
                            .first()
                      
  print(f"-------333BACKEND -------cartItem: {cartItem}")

  form = CartItemForm()
  form["csrf_token"].data = request.cookies["csrf_token"]

  if not item:
    return {"errors" : "Product couldn't be found"}, 404
  if item.seller_id == current_user.id:
    return {"errors" : "You can not add your own product to cart"}, 400

  print(f"-------444BACKEND -------before form.validate_on_submit")

  if form.validate_on_submit():
    if not cartItem:
      data = CartItem(
        user_id = current_user.id,
        product_id = product_id,
        quantity = form.data["quantity"],
        order_id = 0
      )
      db.session.add(data)
      db.session.commit()
      print(f"-------555BACKEND -------if not cartItem, data.to_dict: {data.to_dict_current()}")

      return data.to_dict_current(), 200

    else:
      if cartItem.quantity + form.data["quantity"] > cartItem.product.stock:
        cartItem.quantity = cartItem.product.stock
        cartItem.message = "You have reached the maximum stock for this product."
        db.session.commit()
        return cartItem.to_dict_current(), 200

      else:
        cartItem.quantity += form.data["quantity"]
        db.session.commit()
        return cartItem.to_dict_current(), 200
  else:

    return {"errors": validation_errors_to_error_messages(form.errors)}, 400

# fetch("http://localhost:3000/api/products/5/cart_items", {
#    method: 'POST',
#    body: JSON.stringify({
#     "quantity": 1
#   }),
#    headers: {
#     'Content-type': 'application/json'
#   }
#  })
#  .then(res => res.json())
#  .then(console.log)
