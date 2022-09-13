# React Native Setup Redux and Login/Register JWT Wordpress

    git clone https://github.com/HMDCrew/React-Native-Redux-Login-Register-WP.git
    cd React-Native-Redux-Login-Register-WP
    npm i


## File "screen/Auth.js":
  *this screen use two principal component Login and Register.
   For Redister component is used plugin custom to permite this process with security excluding bot's*
```js

    ...
    // Is used to verify if user is authenticated on load screen 
    componentDidMount() {
        this.isLogged()
    }

    // Is used to verify autentication after complete login from Login or Register component
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.isLogged()
    }

    isLogged() {
        const { navigation } = this.props;

        if ('' !== this.props.login.token && undefined !== this.props.login.token && !this.props.login.isLoaded) {
            navigation.navigate('Home')
        }
        if( false === this.props.login.auth_status && !this.props.login.isLoaded ) {
            ToastAndroid.show('Login falied', ToastAndroid.SHORT);
        }
    }
    ...

    render() {

        const { view_login } = this.state;

        return (
            ...
            <ScrollView style={styles.px_3}>
                {view_login ?
                    <LoginComponent {...this.props} changeView={this.changeView} />
                    :
                    <RegisterComponent {...this.props} changeView={this.changeView} />
                }
            </ScrollView>
            ...
        )
    }
```

## File "components/autentication/Login.js":
*In this component is used redux to permette access Json Web Token (JWT) in all application*
```js
```

## File "components/autentication/Register.js":
**
```js
```











### Note:
other documentation
[React Native Redux Prg.](https://github.com/HMDCrew/React-Native-Redux)
[Customn routes in plugin](https://github.com/HMDCrew/REST-API-WP-Woo)

requirement plugin: Download
[JWT Authentication for WP REST API](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/)
