from flask import Blueprint, jsonify, request 
from flask_login import login_required, current_user
from app.models import db, Product, User 
from datetime import datetime 
from .auth_routes import validation_errors_to_error_messages


product_router = Blueprint('products', __name__)

@product_router.route('/')
def get_all_products(): 
  products = Product.query.all()

  for product in products: 
    return product.to_dict()