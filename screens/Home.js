import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'

import { styles } from '../constants/style'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Settings"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        )
    }
}

export default Home
