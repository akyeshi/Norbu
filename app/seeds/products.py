from app.models import db, Product, environment, SCHEMA

def seed_products(): 


  ''' ------------- valentine ------------- '''

  valentine01 = Product(
    seller_id = 1, 
    name = "Light Pink Red Pearls Beaded Choker Necklace, Red Statement Necklace, Stones Pearls Necklace, Valentines Day Gift, Mom Daughter Gift, Niece", 
    category = 'Valentine', 
    description = 
    '''
    The 'rojo' statement necklace features a combination of recycled glass beads, silver beads and natural pearls.

    ― 𝐃𝐄𝐓𝐀𝐈𝐋𝐒 ―

    • recycled glass beads, sterling silver spheres and natural pearls

    • sterling silver findings and accents

    • necklace is 16 inches long + it has an extension of 2 inches

    • ideal to layer with other necklaces or wear solo

    • slow made with attention to details in our home studio based in Puerto Rico

    • each comes with our branded packaging, ready for gift giving and it includes a polishing pad for maintenance
    ''', 
    price = 120, 
    stock = 8, 
  )

  valentine02 = Product(
    seller_id = 1, 
    name = "Natural Massage Oil | Handmade Massage Lotion - Handcrafted Rose Petals Massage Oil - Valentines Day gift lovers - Romantic Gift under 30", 
    category = 'Valentine', 
    description = 
    '''
    Immerse your skin in the calming and healing benefits of liquid coconut oil and soothing essential oils that are gentle enough for even the most sensitive skin. This relaxing massage oil is handcrafted with purifying essential oils of bergamot, lemon and lavender.

    dimensions
    volume: 120 ml | 4 oz

    ingredients
    liquid coconut oil, rose petals, essential oils of lemon, lavender and bergamot. 
    ''', 
    price = 27.32, 
    stock = 5, 
  )

  valentine03 = Product(
    seller_id = 2, 
    name = "Custom Wedding Neon Sign", 
    category = 'Valentine', 
    description = 
    '''
    ♥ This beautifully neon sign is perfect for your special day ♥

    - Better Together LED Neon Sign in your choice of color -

    Traditional neon is made out of glass that is bent to create its shape. LED neon is made out of flexible LED lights that are encased in a PVC jacket. While both pieces glow, LED neon is durable, cost-effective and an energy-efficient alternative to the classic glass neon that we all love. If used correctly our neon range should last 50,000+hrs

    ♥ MADE FROM
    13mm Flexible LED tubing mounted onto a 4mm acrylic backing.
    Our Neons are made to suit the purchasing countries' voltage and plug style and will come with your local plug type.

    ♥ DIMENSIONS:
    This neon sign measures: 31.5" x 31" (800mm x 780mm) making it a nice large centerpiece for your special day.

    ♥ LEAD TIME
    - Please allow up to 4-6 weeks for production time and shipping as this product is made to order.

    ♥ WHAT'S INCLUDED?
    Neon Sign Customized to Your Specifications
    Power Supply and Adaptor
    Dimmer Switch
    Drill holes for installation

    ♥ NOTES:
    - Listing image is in our warm white colour.
    - Our LED neon is handmade by bending material into shapes. The nature of this process means that there are some bends, curves and sizes we just can’t make.
    We’ll let you know when we run into this with your design!

    ♥ INSTALLING MY NEON
    Our Neons are surprisingly light and on average weigh 6-10lbs (3-5kg)
    They come with pre-drilled holes in the acrylic backing for easy hanging.

    Hang your neon with hooks; wire or heavy-duty removable hooks.

    Suitable hanging methods:
    - Fishing wire (knotted with fisherman’s knots)
    - Thin wire
    - Hooks
    - Rope (correctly knotted)
    - 3m heavy-duty removable hooks (available from your local hardware store)

    ♥ LIGHTING UP MY NEON
    Lighting up your neon is easy! Our Neons plug into the wall and do not come with a battery pack (for very small neons we can offer a battery pack).
    Your custom neon order will include:
    1 x Clear cord 1-2 metres attached to the sign (depending on the size of the sign)
    1 x Adaptor + Transformer (compatible with your country) with a 1-2 meter cord, which connects to the clear cord and plugs into the wall.
    ''', 
    price = 589.85, 
    stock = 2, 
  )

  valentine04 = Product(
    seller_id = 2, 
    name = "Custom Scent - Aroma Candle with Rose petals 7oz - Hand poured Candle - Valentine’s Day gift - Housewarming - Glass Container Candle", 
    category = 'Valentine', 
    description = 
    '''
    - HANDCRAFTED IN CHARLOTTE, NORTH CAROLINA, USA.

    - ALL-NATURAL SOY WAX.

    - 100% COTTON WICK.

    - ECO-FRIENDLY & SUSTAINABLE WAX ONLY.

    - PHTHALATE-FREE, PARAFFIN-FREE.

    Burn in increments of 4 hours for best results. Trim wicks to 1/4" before each use.

    Please also be advised "frosting" may occur and this is not a fault in the candle. This is a natural effect of using soy wax and does not, in any way, impact the performance of your candle.

    Due to the design of our candle, we recommend placing the candle on top of a dish or plate to prevent wax from coming in contact with your surfaces.

    Because all candles are 100 percent handmade, each candle will have minor imperfections by nature and color may slightly vary.
    For irregular shaped candles, we cannot guarantee that each one will be fully burned. 
    ''', 
    price = 27.99, 
    stock = 20, 
  )

  valentine05 = Product(
    seller_id = 3, 
    name = "Custom Mens Necklace - Old English Letter Necklace - Gold Mens Necklace - Father's Day Gift - Personalized Mens Necklace - Gift for Him", 
    category = 'Valentine', 
    description = 
    '''
    Made from 100% 14k Gold Filled (NOT gold vermeil) or Sterling Silver components

    All letter charms are made in-house and are made to order just for you from our studio located in beautiful Vancouver, BC :)

    All raw materials are sourced from the US and are very high quality. Durable enough for everyday wear!

    Each letter charm is approx. 20mm long and 12mm wide but size does vary depending on the letter. Please refer to photos above. Please also note that the alphabet shown is for ILLUSTRATION ONLY and is not an exact representation. Each charm is cut from a 20 gauge sheet.

    The ball chain is 1.5mm wide and the flat curb chain is 1mm wide. Please contact us if you would like a different style of chain (additional costs may apply).

    🎁 Comes ready to gift
    ''', 
    price = 84.31, 
    stock = 15, 
  )

  valentine06 = Product(
    seller_id = 3, 
    name = "Nature Engagement Ring, Mountain Engagement Ring, Nature Diamond Ring, Diamond Mountain Ring, Mountain Wedding Ring", 
    category = 'Valentine', 
    description = 
    '''
    Nature Engagement Ring, Mountain Engagement Ring, Nature Diamond Ring, Diamond Mountain Ring, Mountain Wedding Ring

    Celebrate the start of your new adventure with this elegant diamond mountain ring.

    From the top down, it looks like a sparkling diamond band. But tilt your finger just so and you’ll see its majestic peaks and valleys, reminding you of your resilient spirit.

    Whether you’re saying “I do”, taking a risk to do what you love, or making big changes to live the life you want, let this ring inspire you to brave that worthwhile journey.
    ''', 
    price = 475, 
    stock = 0, 
  )

  valentine07 = Product(
    seller_id = 4, 
    name = "Cozy Socks | Abstract Art Socks | Pink Socks | Gift for Her | Scribble Design", 
    category = 'Valentine', 
    description = 
    '''
    PAR KER made abstract art socks are a perfect and stylish, accessory for your feet.

    Made with high-quality, durable cotton, these classic crew-length style socks are perfect for those that are on their feet all day.

    Expertly crafted and carefully designed with some of our best selling hand-painted pieces of art, these jacquard woven - full cushion socks comfortably make you feel unique and one of a kind just like the chic modern design that bears your feet.

    Made here in the USA

    Designed by hand in San Diego, CA

    Machine Washable with Cold Water

    Tumble Dry Low

    Materials:

    73% Cotton

    15% Polyester

    9% Nylon

    2% Rubber

    1% Spandex
    ''', 
    price = 24.00, 
    stock = 30, 
  )

  valentine08 = Product(
    seller_id = 4, 
    name = "I Dig You Hand Trowel Wood Plant Pick [Valentine’s Day Gift, Encouraging, Uplifting, Houseplant Gifts for Her, Plant Lover, Birthday]", 
    category = 'Valentine', 
    description = 
    '''
    Whether you plan to send a subtle message to your crush or a cute reminder to your partner, this punny plant pick will let them know how much you care. We hope you make a deep impression with this playful gift!

    Spruce up your space or surprise your favorite people with these plant picks as a gesture of your ever growing love. Hereafter plant picks offer playful statements of affection, uplifting messages of personal growth, as well as a plant pun or two. A fun way to add personality to your houseplants, just stick them in the soil with your plant bebes and admire them every time you pass by. Whether you're a plant novice or have named all the plants in your collection, these plant picks will bring whimsy and joy into your everyday.

    Product Details
    • Total Plant Pick Height: approximately 3.5-4"
    • Paired with a fun, colorful paper backing that is ready to gift
    • Recommended to use with indoor plants
    • Made with certified sustainable American hardwood
    • Made in Los Angeles, CA
    ''', 
    price = 9.00, 
    stock = 80, 
  )

  valentine09 = Product(
    seller_id = 5, 
    name = "Glass Blown Neapolitan Mini Vase", 
    category = 'Valentine', 
    description = 
    '''
    Please note that the vase you will receive may not be the one pictured here, but one that is very similar as they are all one of a kind.

    This is a one of a kind glass blown mini vase handmade with love in Vancouver, BC.

    This vase is a colourful creation with colours of milky white, raspberry, flamingo, and mocha.

    Vase measures approximately 2-3” H X 1.5-2” D

    Truly one of a kind art glass for your home! Perfect little vase for a flower or two.

    Please note this listing is for one vase :) Thanks!
    ''', 
    price = 50.74, 
    stock = 42, 
  )

  valentine10 = Product(
    seller_id = 5, 
    name = "heart mittens, knit mittens for women, wool mittens, winter accessories, fleece lined mittens, birthday gift, valentine’s day gift", 
    category = 'Valentine', 
    description = 
    '''
    Handmade and shipped from Winnipeg, Manitoba, Canada!

    These guys are called Little Heart Mittens! These knit mittens are made from material that is 20% wool and 80% acrylic so they will help keep your little fingers warm during those cold spells! This little winter accessory is perfect as a valentines day gift, birthday gift, or just a simple gift for her. All mittens now come fleece-lined! Fleece color will either be black, white, or grey - depending on the main color of the mitten.

    SIZING
    This item comes in a ONE SIZE ONLY. See below for measurements. This is the measurement from the outside of the mitt. The inside of the mitt with fleece will vary 0.5-1in. tighter. The cuff of the mittens are not fleeced.
    9in. high (including cuff)
    7in. high (excluding cuff)
    2.5in. thumb inseam
    3.75in. hand width
    ''', 
    price = 46.84, 
    stock = 15, 
  )


  # valentine 
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
  db.session.commit()



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities

def undo_products(): 
  if environment == "production":
      db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM products")

  db.session.commit()
