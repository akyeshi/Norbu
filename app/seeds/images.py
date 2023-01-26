from app.models import db, Image, environment, SCHEMA

def seed_images(): 

  #valentine images 
  valentine01 = Image(
    url="https://i.etsystatic.com/8924622/r/il/d66598/4326514702/il_1588xN.4326514702_2tj3.jpg", 
    product_id="1"
  )
  valentine02 = Image(
    url="https://i.etsystatic.com/8924622/r/il/1cdbb0/4526018248/il_1588xN.4526018248_jaq1.jpg", 
    product_id="1"
  )
  valentine03 = Image(
    url="https://i.etsystatic.com/8924622/r/il/22d1ee/4337239229/il_1588xN.4337239229_h6f2.jpg", 
    product_id="1"
  )
  valentine04 = Image(
    url="https://i.etsystatic.com/15246890/r/il/793d83/4586763577/il_1588xN.4586763577_ci9w.jpg", 
    product_id="2"
  )
  valentine05 = Image(
    url="https://i.etsystatic.com/15246890/r/il/3881a3/3987905350/il_1588xN.3987905350_4h3u.jpg", 
    product_id="2"
  )
  valentine06 = Image(
    url="https://i.etsystatic.com/15246890/r/il/9d21d2/2547860880/il_1588xN.2547860880_ee4o.jpg", 
    product_id="2"
  )
  valentine07 = Image(
    url="https://i.etsystatic.com/12140672/r/il/d3cb60/1963173703/il_1588xN.1963173703_bpxl.jpg", 
    product_id="3"
  )
  valentine08 = Image(
    url="https://i.etsystatic.com/12140672/r/il/c9d30f/1915629136/il_1588xN.1915629136_631p.jpg", 
    product_id="3"
  )
  valentine09 = Image(
    url="https://i.etsystatic.com/12140672/r/il/ae21cb/2223593107/il_1588xN.2223593107_rh4v.jpg", 
    product_id="3"
  )
  valentine10 = Image(
    url="https://i.etsystatic.com/35558980/r/il/a6cbfd/4481663808/il_1588xN.4481663808_jl0m.jpg", 
    product_id="4"
  )
  valentine11 = Image(
    url="https://i.etsystatic.com/35558980/r/il/268105/4481663822/il_1588xN.4481663822_30q5.jpg", 
    product_id="4"
  )
  valentine12 = Image(
    url="https://i.etsystatic.com/35558980/r/il/572ed5/4481664132/il_1588xN.4481664132_ilsc.jpg", 
    product_id="4"
  )
  valentine13 = Image(
    url="https://i.etsystatic.com/12565301/r/il/b33b60/1900093743/il_1588xN.1900093743_t756.jpg", 
    product_id="5"
  )
  valentine14 = Image(
    url="https://i.etsystatic.com/12565301/r/il/0d5c64/1937906985/il_1588xN.1937906985_swrl.jpg", 
    product_id="5"
  )
  valentine15 = Image(
    url="https://i.etsystatic.com/12565301/r/il/34c7c6/3782366638/il_1588xN.3782366638_5kev.jpg", 
    product_id="5"
  )
  valentine16 = Image(
    url="https://i.etsystatic.com/6891987/r/il/f8a5a9/2421033695/il_1588xN.2421033695_3gcs.jpg", 
    product_id="6"
  )
  valentine17 = Image(
    url="https://i.etsystatic.com/6891987/r/il/4086fa/2421029129/il_1588xN.2421029129_sgr3.jpg", 
    product_id="6"
  )
  valentine18 = Image(
    url="https://i.etsystatic.com/6891987/r/il/2b796a/2421031331/il_1588xN.2421031331_odgc.jpg", 
    product_id="6"
  )
  valentine19 = Image(
    url="https://i.etsystatic.com/27024418/r/il/774240/4274204700/il_1588xN.4274204700_j5h0.jpg", 
    product_id="7"
  )
  valentine20 = Image(
    url="https://i.etsystatic.com/27024418/r/il/a70ada/4274203104/il_1588xN.4274203104_pjxe.jpg", 
    product_id="7"
  )
  valentine21 = Image(
    url="https://i.etsystatic.com/27024418/r/il/357979/4274203054/il_1588xN.4274203054_4xp7.jpg", 
    product_id="7"
  )
  valentine22 = Image(
    url="https://i.etsystatic.com/6748817/r/il/f1aa1b/3081997883/il_1588xN.3081997883_snra.jpg", 
    product_id="8"
  )
  valentine23 = Image(
    url="https://i.etsystatic.com/6748817/r/il/5b5563/3034275648/il_1588xN.3034275648_bv33.jpg", 
    product_id="8"
  )
  valentine24 = Image(
    url="https://i.etsystatic.com/6748817/r/il/371e82/3191078416/il_1588xN.3191078416_l4a2.jpg", 
    product_id="8"
  )
  valentine25 = Image(
    url="https://i.etsystatic.com/10051134/r/il/9d56de/4546121108/il_1588xN.4546121108_pv7k.jpg", 
    product_id="9"
  )
  valentine26 = Image(
    url="https://i.etsystatic.com/10051134/r/il/5ece55/3237337678/il_1588xN.3237337678_pcei.jpg", 
    product_id="9"
  )
  valentine27 = Image(
    url="https://i.etsystatic.com/10051134/r/il/26b23a/4268468672/il_1588xN.4268468672_dqb0.jpg", 
    product_id="9"
  )
  valentine28 = Image(
    url="https://i.etsystatic.com/20321932/r/il/1bd224/3565662845/il_1588xN.3565662845_1k53.jpg", 
    product_id="10"
  )
  valentine29 = Image(
    url="https://i.etsystatic.com/20321932/r/il/3021e3/3518024614/il_1588xN.3518024614_rikl.jpg", 
    product_id="10"
  )
  valentine30 = Image(
    url="https://i.etsystatic.com/20321932/r/il/655772/3922988849/il_1588xN.3922988849_g82j.jpg", 
    product_id="10"
  )


  db.session.add(valentine01)
  db.session.add(valentine02)
  db.session.add(valentine03)
  db.session.add(valentine04)
  db.session.add(valentine05)
  db.session.add(valentine06)
  db.session.add(valentine07)
  db.session.add(valentine08)
  db.session.add(valentine09)
  db.session.add(valentine10)
  db.session.add(valentine11)
  db.session.add(valentine12)
  db.session.add(valentine13)
  db.session.add(valentine14)
  db.session.add(valentine15)
  db.session.add(valentine16)
  db.session.add(valentine17)
  db.session.add(valentine18)
  db.session.add(valentine19)
  db.session.add(valentine20)
  db.session.add(valentine21)
  db.session.add(valentine22)
  db.session.add(valentine23)
  db.session.add(valentine24)
  db.session.add(valentine25)
  db.session.add(valentine26)
  db.session.add(valentine27)
  db.session.add(valentine28)
  db.session.add(valentine29)
  db.session.add(valentine30)
  db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities

def undo_images(): 
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM images")

  db.session.commit()
