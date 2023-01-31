from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Product(db.Model): 
  __tablename__ = "products"

  if environment == "production": 
    __table_args__ = {'schema': SCHEMA}

  
  # table columns
  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  category = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(20000), nullable=False)
  price = db.Column(db.Float, nullable=False)
  stock = db.Column(db.Integer, nullable=False)


  # table relationships attributes 
  users = db.relationship("User", back_populates="products")
  images = db.relationship("Image", back_populates="products", cascade="all, delete")
  reviews = db.relationship("Review", back_populates="product", cascade="all, delete")


  # instance methods
  def get_avgstars(self): 
    if len(self.reviews) > 0: 
      avg = sum(review.stars for review in self.reviews) / len(self.reviews)
      return round(avg, 1)
    else: 
      return 0.00

  def to_dict(self): 
    return {
      'id': self.id, 
      'name': self.name, 
      'category': self.category, 
      'description': self.description, 
      'price': self.price, 
      'stock': self.stock, 
      'seller_id': self.seller_id
    }


  def to_dict_search(self):
      return {
          'id': self.id,
          'category': self.category,
          'name': self.name,
          'description': self.description,
          'price': self.price,
          'stock': self.stock,
          'sellerId': self.seller_id,
          'previewImage': self.images[0].url,
          'avgRating': self.get_avgstars(),
          'numReviews': len(self.reviews),
          'storeName': self.users.username
      }

