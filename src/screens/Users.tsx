import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/main";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction, getUsersEndReachedAction } from "../reducers/users";
import { RootState } from "../utils/store";
import { UsersStateType } from "../utils/types";
import { FlatList } from "react-native-gesture-handler";
import UserView from "../components/UserView";

const Users = ({ route }: StackScreenProps<RootStackParamList, "Users">): React.JSX.Element => {

    const dispatch = useDispatch();
    const users = useSelector<RootState, UsersStateType>(state => state.users);

    const pageNumber = useRef<number>(1);
    const userId = route.params.userId

    useEffect(() => {
        dispatch(getUsersAction({ id: userId, type: route.params.type }));

        return () => {
            dispatch(getUsersEndReachedAction({ reached: false, id: userId }));
        }
    }, []);

    const onEnd = () => {
        if (users[userId] && !users[userId].loading && !users[userId].endReached)
            dispatch(getUsersAction({ id: userId, type: route.params.type, pageNumber: ++pageNumber.current }));
    }

    if (users[userId]?.loading && !users[userId]?.data)
        return <Text style={styles.loadingText}>Loading...</Text>
    if (users[userId]?.error)
        return <Text style={styles.loadingText}>Something went wrong!</Text>

    return <View style={styles.container}>
        <FlatList
            contentContainerStyle={styles.list}
            data={users[userId]?.data}
            renderItem={({ item }) => <UserView user={item} list/>}
            keyExtractor={(item) => String(item.id)}
            ListFooterComponent={() => <View style={styles.footerContainer}>
                {users[userId]?.loading && <Text style={styles.text}>Loading...</Text>}
            </View>}
            onEndReached={onEnd}
        />
    </View>
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { gap: 5, marginTop: 5, marginBottom: 10 },
    footerContainer: { width: '100%', height: 50, justifyContent: 'center' },
    text: { textAlign: 'center' },
    loadingText: { textAlign: 'center', marginTop: 20 }
});

export default Users;