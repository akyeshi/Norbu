from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


class Product(db.Model): 
  __tablename__ = "products"

  if environment == "production": 
    __table_args__ = {'schema': SCHEMA}

  
  ''' table columns '''
  id = db.Column(db.Integer, primary_key=True)
  seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  category = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(1500), nullable=False)
  price = db.Column(db.Float, nullable=False)
  stock = db.Column(db.Integer, nullable=False)


  ''' relationshps with other tables '''
  users = db.relationship("User", back_populates="products")



  ''' instance method '''
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
