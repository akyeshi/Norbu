from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
      username='jmsbond', 
      email='jmsbond@aa.io', 
      password='password', 
      first_name='James', 
      last_name='Bond'
    )

    marnie = User(
      username='marnie', 
      email='marnie@aa.io', 
      password='password', 
      first_name='Mary', 
      last_name='Oslo'
    )

    bobbie = User(
      username='bobbie', 
      email='bobbie@aa.io', 
      password='password',
      first_name='Bob', 
      last_name='Dylan'
    )

    dylan = User(
      username='dylan', 
      email='dylan@aa.io', 
      password='password',
      first_name='Dylan', 
      last_name='Thomas'
    )

    yeshi = User(
      username='akyeshi', 
      email='akyeshi@aa.io', 
      password='scientist', 
      first_name='Kenduke', 
      last_name='Yeshi'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(dylan)
    db.session.add(yeshi)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()