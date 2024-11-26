import React, { useEffect, useState, useRef } from "react";
import type { RootState } from "../utils/store";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HomeStateType } from "../utils/types";
import { searchUserAction, searchUserEmptyAction } from "../reducers/home";
import UserView from "../components/UserView";

const Home = (): React.JSX.Element => {
    const dispatch = useDispatch();
    const user = useSelector<RootState, HomeStateType>(state => state.home);

    const [searchTerm, setSreachTerm] = useState<string>('');
    const lastSearchTerm = useRef<string>('')

    useEffect(() => {
        let searchTimeout = setTimeout(() => {
            if (lastSearchTerm.current != searchTerm) {
                if (searchTerm) {
                    dispatch(searchUserAction({ id: searchTerm }));
                } else {
                    dispatch(searchUserEmptyAction());
                }
                lastSearchTerm.current = searchTerm
            }
        }, 500);

        return () => clearTimeout(searchTimeout);
    }, [searchTerm])

    return <View style={styles.container}>
        <TextInput
            placeholder="Username"
            value={searchTerm}
            onChangeText={setSreachTerm}
            style={styles.textInput}
        />
        {user.loading ?
            <Text>Loading ...</Text>
            :
            user.error ?
                <Text>{user.error}</Text>
                :
                user.data ?
                    <UserView user={user.data}/>
                    :
                    null
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        width: '95%',
        height: 50,
        marginVertical: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray'
    }
})

export default Home;