import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import type { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "../navigation/main";
import { useNavigation } from "@react-navigation/native";
import type { User as UserType, UserStateType } from "../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import { getUserAction, getUserResetAction } from "../reducers/user";

const User = ({ route }: StackScreenProps<RootStackParamList, "User">): React.JSX.Element => {

    const dispatch = useDispatch();
    const userInfo = useSelector<RootState, UserStateType>(state => state.user);
    const user = route.params.user

    useEffect(() => {
        if (route.params.fetch) {
            dispatch(getUserAction({ id: user.userName, userPage: true }));
        }

        return () => {
            dispatch(getUserResetAction(user.userName));
        }
    }, []);

    if (!route.params.fetch)
        return <UserInfoView user={user}/>
    if (userInfo[user.userName]?.loading)
        return <Text>Loading...</Text>
    if (userInfo?.[user.userName]?.data)
        return <UserInfoView user={userInfo[user.userName].data}/>
    if (userInfo?.[user.userName]?.data)
        return <Text>Something went wrong!</Text>
    return <></>
}

const UserInfoView = ({ user }: { user: UserType | null }): React.JSX.Element => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onFollowers = () => {
        navigation.push("Users", { userId: user?.userName, type: 'followers' })
    }
    const onFollowing = () => {
        navigation.push("Users", { userId: user?.userName, type: 'following' })
    }

    if (!user)
        return <></>
    return <View style={styles.container}>
        <View style={styles.infoContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar}/>
            <View style={styles.nameConatiner}>
                <Text style={styles.textBold}>{`Name: ${user.name || user.userName}`}</Text>
                <Text>{`Username: ${user.userName}`}</Text>
            </View>
        </View>
        {!!user.description && <>
            <Text style={styles.textBold}>Description:</Text>
            <Text>{user.description}</Text>
        </>}
        <View style={styles.buttonContainer}>
            <TouchableOpacity disabled={user.followers == 0} onPress={onFollowers} style={styles.button}>
                <Text>{`Followers: ${user.followers}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={user.following == 0} onPress={onFollowing} style={styles.button}>
                <Text>{`Following: ${user.following}`}</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, gap: 10 },
    infoContainer: { flexDirection: 'row', gap: 10 },
    avatar: { width: 100, height: 100, borderRadius: 10 },
    nameConatiner: { gap: 10 },
    textBold: { fontWeight: 'bold' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
    button: { backgroundColor: 'lightblue', borderRadius: 15, width: 150, height: 50, justifyContent: 'center', alignItems: 'center' }
})

export default User;