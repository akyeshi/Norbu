from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField, SelectField, DecimalField
from wtforms.validators import DataRequired, Length, NumberRange, InputRequired

CATEGORIES = [
  "Valentine", 
  "Wedding & Party", 
  "Home & Living", 
  "Clothing & Shoes", 
  "Gifts & Gift Cards", 
  "Art & Collectibles"
]


class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=10, max=255, message="Name must be between 10 and 255 characters long")])
    category = SelectField('Category', choices=CATEGORIES, validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired(), Length(min=10, max=1000000, message="Description must be between 10 and 1000 characters long")])
    price = DecimalField('Price', places=2, validators=[InputRequired(), NumberRange(min=1, max=1000, message="Price must be between $1 and $1000")])
    stock = IntegerField('Stock', validators=[InputRequired(), NumberRange(min=1, max=1000, message="Stock must be between 1 and 1000")])
    submit = SubmitField('Submit')