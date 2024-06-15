import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
   StyleSheet,
  //  ScrollView,
   Button,
   FlatList
   
  } from 'react-native';
  import {  useSelector } from 'react-redux';
  import { COLORS, SIZES, icons,images} from '../constants';
  import React,{useEffect, useState} from 'react';
  import { useDispatch} from 'react-redux';
  import {addtocart} from "../ACTIONS";



const Home = ({ navigation }) => {
  // const [profile, setProfile] = React.useState(profileData);
   // const profileData = {
    //     name: 'Username', 
    // }
    const [addedToCart, setAddedToCart] = useState({});
    const [cartItems,setCartItems]=useState(0)
    const cartData=useSelector((state)=>state.reducer);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const dispatch=useDispatch();

 const goToCart = () => {
    navigation.navigate('ShoppingCart');
  };
    const [categories, setCategories] = useState([
        {
          category_id: 1,
          type: "Clearance Sale",
          books: [
            {
              book_id: 1,
              title: "To Sleep in a Sea of Stars",
              path: images.sea,
              author: "Christopher Paolini",
              description: "This massive volume about a brave interplanetary explorer in an impossible situation was one of my biggest reading surprises of the year; since it was written by the young author of the “Eragon” novels, and since those novels were decidedly pedestrian, I was ready to be disappointed by this doorstop - and instead found it totally absorbing.",
              price: 4000,
              disco: "20%OFF",
              paths: [
                { im:images.sea},
                { im:images.sea},
                { im:images.sea},
                // Add more pages as needed
            ]
            },
            {
              book_id: 2,
              title: "The Tiny Dragon",
              path: images.theTinyDragon,
              author: "Christopher Paolini",
              description: "This massive volume about a brave interplanetary explorer in an impossible situation was one of my biggest reading surprises of the year; since it was written by the young author of the “Eragon” novels, and since those novels were decidedly pedestrian, I was ready to be disappointed by this doorstop - and instead found it totally absorbing.",
              price: 4000,
              disco: "20%OFF",// discount
              paths: [
                { im:images.sea},
                { im:images.sea},
                { im:images.sea},
                // Add more pages as needed
            ]
            },
          
            {
              book_id: 3,
              title: "The Metropolis",
              path: images.theMetropolist,
              author: "Christopher Paolini",
              description: "This massive volume about a brave interplanetary explorer in an impossible situation was one of my biggest reading surprises of the year; since it was written by the young author of the “Eragon” novels, and since those novels were decidedly pedestrian, I was ready to be disappointed by this doorstop - and instead found it totally absorbing.",
              price: 4000,
              disco: "20%OFF",
              paths: [
                { im:images.sea},
                { im:images.sea},
                { im:images.sea},
                // Add more pages as needed
            ]
            },
           
          ]
        }
      ]);

    useEffect(()=>{
        setCartItems(cartData.length)
    },[cartData])// this useState update the value only when it is called thats why we write [cartdata]
    
    useEffect(() => {
      const updatedAddedToCart = {};
      cartData.forEach((item) => {
          updatedAddedToCart[item.title] = true;
      });
      setAddedToCart(updatedAddedToCart);
  }, [cartData]);
  
  const handleAddtoCart = (item) => {
      if (addedToCart[item.title]) {
          // If already added to cart, remove it
          // Dispatch action to remove item from cart
      } else {
          // If not added to cart, add it
          dispatch(addtocart(item));
      }
  };

    // function renderHeader() {
    //     return (
    //         <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center' }}>
    //             <View style={{ flex: 1 }}>
    //                 <View style={{ marginRight: SIZES.padding }}>
    //                     <Text style={{ fontFamily:'ProtestRiot-Regular',fontSize:39, color: COLORS.primary }}></Text>
    //                     {/* <Text style={{ ...FONTS.h2, color: COLORS.white }}>{profile.name}</Text> */}
    //                 </View>
    //             </View>
    //             <TouchableOpacity style={{backgroundColor: COLORS.primary, height: 48,
    //                     paddingLeft: 3,
    //                     paddingRight: SIZES.radius,
    //                     borderRadius: 20,
    //                     marginTop:30,
    //                     width: 100,
    //                 }}
    //                 onPress={()=>navigation.navigate('signup')}
    //             >
    //               <View style={{ flex: 1,flexDirection: 'row'}}>
    //                <Text style={{color:COLORS.gray1,fontFamily:'ProtestRiot-Regular',fontSize:25,marginLeft:10}}>Signup</Text>
    //                 </View>
    //             </TouchableOpacity>               
    //         </View>
    //     )
    // }
    const renderCategoryData = () => {
        const selectedCategoryData = categories.find(category => category.category_id === selectedCategory);
      
        if (!selectedCategoryData) {
          return null;
        }
      
        return (
          <FlatList
            data={selectedCategoryData.books}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom:"70%",paddingTop:5 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.bookContainer}
                onPress={() => navigation.navigate("BookDetail", { book: item })}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={item.path}
                    resizeMode="cover"
                    style={styles.bookImage}
                  />
                </View>
                <View style={styles.bookDetails}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.author}>By : {item.author}</Text>
                  <Text style={styles.price}>Rs. {item.price}</Text>
                  {item.disco && (
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>{item.disco}</Text>
              </View>
            )}
                  <Button
                    onPress={() => handleAddtoCart(item)}
                    color='black'
                    title={addedToCart[item.title] ? 'Added to Cart' : 'ADD TO CART'}
                    disabled={addedToCart[item.title]}
                    style={styles.addButton}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        );
      };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor:'white'}}>
            {/* Header Section */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{ fontSize: 35, padding: 5, color:'black', fontFamily: 'PlayfairDisplay-Bold' }}>Clearance Sale</Text>
  <TouchableOpacity style={{ height: 30 }} onPress={goToCart}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={icons.bookmark_icon}
        resizeMode="contain"
        style={{ marginLeft: 8, width: 45, height: 40 }}
      />
      <Text style={{ fontFamily: 'PlayfairDisplay-Bold', color: 'black', marginRight: 10, fontSize: 15 }}>{cartItems}</Text>
    </View>
  </TouchableOpacity>
</View>

            {/* <ScrollView  contentContainerStyle={{ paddingBottom: 100,marginTop: SIZES.radius}}> */}
                {/* Books sale */}
                <View>
                    {renderCategoryData()}
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    bookContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      borderRadius: SIZES.radius,
      marginBottom: SIZES.padding,
      width: '100%',
      elevation: 3,
      shadowColor: COLORS.black,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    imageContainer: {
      width: '30%',
      height: 160,
      borderTopLeftRadius: SIZES.radius,
      borderBottomLeftRadius: SIZES.radius,
      overflow: 'hidden',
    },
    bookImage: {
      width: '100%',
      height: '100%',
    },
    bookDetails: {
      flex: 1,
      padding: SIZES.padding,
    },
    bookTitle: {
      fontSize: SIZES.body2,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.black,
      marginBottom: 5,
    },
    author: {
      fontSize: SIZES.body3,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.gray,
      marginBottom: 5,
    },
    price: {
      fontSize: SIZES.body3,
      fontFamily: 'PlayfairDisplay-Bold',
      color: COLORS.black,
      marginBottom: 5,
    },
    addButton: {
      alignSelf: 'flex-end',
    },
    discountContainer: {
      position: 'absolute',
      top: 1,
      right: 10,
      backgroundColor: 'red',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    discountText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
   
  });

  
export default Home;