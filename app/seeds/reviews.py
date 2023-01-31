from app.models import db, Review, environment, SCHEMA
from datetime import datetime


def seed_reviews(): 

  # valentine products 
  valentineproduct01review01 = Review (
    created_at = datetime.now(), 
    user_id = 5, 
    product_id = 1, 
    stars = 4.8, 
    review = 
    '''
    This is the most beautiful delicate necklace I’ve ever owned. The owner did what I asked and was great to work with. Shipping was fast.
    '''
  )
  valentineproduct01review02 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 1, 
    stars = 5, 
    review = 
    '''
    So cute! Second time buying this one my first one lasted over a year i wore it everyday even showered with it and didnt turn rusty. i took it off once and lost it lol
    '''
  )
  valentineproduct02review01 = Review (
    created_at = datetime.now(), 
    user_id = 3, 
    product_id = 2, 
    stars = 5, 
    review = 
    '''
    Purchased this for my husband as a gift for Valentine’s Day. Haven’t gifted it yet, but tested a small dab out and can’t wait to use it again! Quick shipping and great packaging. Even came with a few small bonus items!
    '''
  )
  valentineproduct02review02 = Review (
    created_at = datetime.now(), 
    user_id = 5, 
    product_id = 2, 
    stars = 4.7, 
    review = 
    '''
    Seller is very responsive and replied to my message within a very short time. The product is amazing and smells even better!!!! They have a loyal customer and I can't wait to order more items!!
    '''
  )
  valentineproduct03review01 = Review (
    created_at = datetime.now(), 
    user_id = 1, 
    product_id = 3, 
    stars = 4.8, 
    review = 
    '''
    Loved our sign!!! 36in Neutral white and in font Hesterica. Tammy was so helpful and quick with answers. We needed our sign in one month, she got it to us in 2 weeks. It was just as we expected.
    '''
  )
  valentineproduct03review02 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 3, 
    stars = 5, 
    review = 
    '''
    The quality was incredible and customer service was amazing. They were so easy to work with and always prompt.
    '''
  )
  valentineproduct04review01 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 4, 
    stars = 4.9, 
    review = 
    '''
    The picture doesn't even do these justice! Sooo pretty! Nothing but beautiful, quality beads throughout the entire strand. Thanks!
    '''
  )
  valentineproduct04review02 = Review (
    created_at = datetime.now(), 
    user_id = 3, 
    product_id = 4, 
    stars = 4.7, 
    review = 
    '''
    Wow, this is spot on fig, and smells INSANE!!!!! (in a good way!!!). Shop owner is super kind, I wanted to switch to the clear glass and she answered promptly!
    '''
  )
  valentineproduct05review01 = Review (
    created_at = datetime.now(), 
    user_id = 1, 
    product_id = 5, 
    stars = 2.6, 
    review = 
    '''
    This doesn’t look at all like how the picture the font is completely different. There is no outline border and looks very cheap and I’m sad. Why can’t you sell things that match the picture exactly that’s why people purchase it based off of pictures but thanks for ruining Valentine’s Day gifts.
    '''
  )
  valentineproduct05review02 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 5, 
    stars = 2.8, 
    review = 
    '''
    Took almost a month to ship and while I understand it was the holidays the estimated shipping was way off and arrived late. Ordered a new one from a different company that arrived insanely fast and kept this one for myself. While it’s pretty it scratches really easily!
    '''
  )
  valentineproduct06review01 = Review (
    created_at = datetime.now(), 
    user_id = 1, 
    product_id = 6, 
    stars = 4.4, 
    review = 
    '''
    Lovely! A matching gift for my sister and I. Fits on my wrist wonderfully. I can't wait to give the other to my sister. Thank you so much!
    '''
  )
  valentineproduct06review02 = Review (
    created_at = datetime.now(), 
    user_id = 2, 
    product_id = 6, 
    stars = 4.8, 
    review = 
    '''
    Love, love our sophisticated friendship bracelets. Seller was a joy to work with. Would definitely order from her again!
    '''
  )
  valentineproduct07review01 = Review (
    created_at = datetime.now(), 
    user_id = 3, 
    product_id = 7, 
    stars = 4.6, 
    review = 
    '''
    Very soft and comfortable socks. Would definitely buy another pair!
    '''
  )
  valentineproduct07review02 = Review (
    created_at = datetime.now(), 
    user_id = 2, 
    product_id = 7, 
    stars = 3.9, 
    review = 
    '''
    Nice and comfy. A little thin.
    '''
  )
  valentineproduct08review01 = Review (
    created_at = datetime.now(), 
    user_id = 1, 
    product_id = 8, 
    stars = 4.8, 
    review = 
    '''
    Love, love, love! My boyfriend is a gardener and keeps houseplants, this is going in a new plant I am getting him for Valentine's Day. <3
    '''
  )
  valentineproduct08review02 = Review (
    created_at = datetime.now(), 
    user_id = 5, 
    product_id = 8, 
    stars = 4, 
    review = 
    '''
    Workmanship very nice. Very cute little item to put in flower containers.
    '''
  )
  valentineproduct09review01 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 9, 
    stars = 5, 
    review = 
    '''
    Excellent craftsmanship and gorgeous little vase! I bought this ahead of the holidays because I knew this would make a great present and it shipped super fast, which is a plus.
    '''
  )
  valentineproduct09review02 = Review (
    created_at = datetime.now(), 
    user_id = 3, 
    product_id = 9, 
    stars = 4.5, 
    review = 
    '''
    Pretty but disappointed with the price for the very small size.
    '''
  )
  valentineproduct10review01 = Review (
    created_at = datetime.now(), 
    user_id = 1, 
    product_id = 10, 
    stars = 4, 
    review = 
    '''
    Ah! I am SO happy for these mittens 🥰 They are so well made, thick and very warm. The fleece lining is such a nice touch. Absolutely adorable! Very happy with this purchase.
    '''
  )
  valentineproduct10review02 = Review (
    created_at = datetime.now(), 
    user_id = 4, 
    product_id = 10, 
    stars = 3.5, 
    review = 
    '''
    Mittens look good, but might be a bit small for my girlfriend. Size is as described.
    '''
  )




  db.session.add(valentineproduct01review01)
  db.session.add(valentineproduct01review02)
  db.session.add(valentineproduct02review01)
  db.session.add(valentineproduct02review02)
  db.session.add(valentineproduct03review01)
  db.session.add(valentineproduct03review02)
  db.session.add(valentineproduct04review01)
  db.session.add(valentineproduct04review02)
  db.session.add(valentineproduct05review01)
  db.session.add(valentineproduct05review02)
  db.session.add(valentineproduct06review01)
  db.session.add(valentineproduct06review02)
  db.session.add(valentineproduct07review01)
  db.session.add(valentineproduct07review02)
  db.session.add(valentineproduct08review01)
  db.session.add(valentineproduct08review02)
  db.session.add(valentineproduct09review01)
  db.session.add(valentineproduct09review02)
  db.session.add(valentineproduct10review01)
  db.session.add(valentineproduct10review02)
  db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities

def undo_reviews(): 
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM reviews")

  db.session.commit()
