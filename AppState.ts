import { Account } from './models/Account'
export const AppState = reactive({
  user: null,
  account: {} as Account,


  featuredProducts:[
    {id:0,name:'Sun Bracelet',price:0.1,img:"https://images.unsplash.com/photo-1632670549453-7a3dfac254a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",description:"The 'Sun Bracelet' is a stunning accessory for women, perfect for adding a touch of elegance and charm to any outfit. This beautiful piece is crafted from high-quality materials, making it both durable and long-lasting.\n The centerpiece of the bracelet is a radiant sun charm, that is intricately designed to catch the light and sparkle in the sun. The sun charm is surrounded by a delicate chain, that wraps comfortably around the wrist. The chain is adjustable, so it can fit any wrist size.\n The 'Sun Bracelet' is perfect for wearing on a sunny day, as the sun charm will sparkle in the sun and add a touch of glamour to any outfit. It's perfect for everyday wear, and can be paired with any outfit, from casual to formal. This elegant bracelet is perfect for adding a touch of elegance and class to any outfit, and is sure to be a treasured piece in any jewelry collection.\n It makes a great gift for a loved one or a treat for yourself.The 'Sun Bracelet' is a must-have accessory that will complement any style and add a touch of sophistication to any outfit. It's perfect for brightening up your day and adding a touch of sun to your wrist!"},

  ]
})
