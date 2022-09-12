# React Native Setup Redux and WooCommerceAPI

    git clone https://github.com/HMDCrew/React-Native-Redux.git
    cd React-Native-Redux
    npm i


## Folder "assets" is used to insert images, icons or fonts:

 *the relative requirements is sugested using the style.js file or theme.js in "constants" folder*

     style.js => you can find structure like scss file but can you make a functions on it
     theme.js => you can setup your majority colors used or default sizes it used for biggest
                 project to simplify work
     
     (the fonts is required in file navigation/index.js)


## Folder "libs" is used only for middlewhere or like constructors:
 *in this case we find only the WooCommerceAPI.js for permite requests to site store


## File "navigation/index.js":
 *this file is used for load fonts in application and manage StackNavigator in application*

```js

    ...

    // Load fonts
    async _loadFontsAsync() {
        await Font.loadAsync(themeFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
    
    ...
    
    render() {

        ...

        return (
            <NavigationContainer theme={this.state.theme}>
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="Home"
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Details" component={Details} />
                    ...
                </Stack.Navigator>
            </NavigationContainer>
        );
    };

```

## Folder "screens":
 *use this folder to build your application pages for StackNavigator in "navigation/index.js"*

ex: screens/Home.js
```js
class Home extends Component {
    
    ...
    
    // functions for invok request to woocommerce api on mount Home component
    componentDidMount() {
        this.props.getProducts()
        this.props.getCategories()
    }

    render() {
        const { navigation } = this.props;

        if (!this.props.store.categories.isLoading) {
            return (
                <SafeAreaView style={styles.d_flex}>
                    <FlatList
                        data={this.props.store.categories.list}
                        renderItem={({ item }) => <Text>{item.name}</Text>}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                </SafeAreaView>
            )
        } else {
            return (<Text>Loading...</Text>)
        }
    }
}

// Remaping Redux store for props in Home component
const mapStateToProps = (state) => {
    return {
        store: {
            ...
            categories: {
                list: state.categories.list,
                isLoading: state.categories.isLoading
            },
        }
    };
}

// connect redux functions for invok woocommerce api to props Home component
const mapDispatchToProps = {
    ...
    getCategories
}

// Redux function to connect component with redux functions and redux store
export default connect(mapStateToProps, mapDispatchToProps)(Home)

```

## Folder "store":
 *Redux store with redux toolkit for simplify implementation redux ACTIONS*

ex: store/features/categoriesSlice.js
```js

// Export function to permite invok request to REST API from components
export { getCategories };

// Store init
const initialState = {
    list: [],
    isLoading: true
};

// Redux Store to save the rest (in this is menioned the exported functions with relative status loading)
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.isLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list = action.payload;
        },
        [getCategories.rejected]: (state) => {
            state.isLoading = false;
        },
    },
});

export default categoriesSlice.reducer;
```

    API requests file

ex: store/REST/api.js
```js

...

export const getCategories = createAsyncThunk('store/categories', () => {

    const data = {
        per_page: 100
    };

    return WooCommerce.get("products/categories", data)
        .then((resp) => resp)
        .catch((err) => console.log(err));
});

```



# NB:
example of request woocommerce api from component class

```js

export class People extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prod: {},
      isLoaded: false
    }
  }

  async componentDidMount() {
    try {
      let response = await WooCommerce.get("products", { categories: 16 })
      this.setState({ prod: response, isLoaded: true })
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    const { prod, isLoaded } = this.state;

    return (
      <View>
        {
          isLoaded ?
            /* i'm used element number 5 in array with products but you can customize this part */
            <Image
              source={{ uri: prod[5].images[0].src }}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40
              }}
            />
            : null
        }
      </View>
    )
  }
}
```

# NOTE:
the store api keys is on file constants/env.js that for problem with compatibility with library *react-native-dotenv*
usage:
```js
import env from './constants/env.js'

console.log(env.SITE_URL);
```
