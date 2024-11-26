import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"
import type { User } from "../utils/types";

const UserView = ({ user, list }: { user: User, list?: boolean }): React.JSX.Element => {

    const navigation = useNavigation<StackNavigationProp<any>>();

    const onRow = () => {
        if (list) {
            navigation.push('User', { fetch: true, user: { userName: user.userName } });
        } else {
            navigation.push('User', { fetch: false, user });
        }
    };

    return <TouchableOpacity onPress={onRow} style={styles.container}>
        <View style={styles.firstRow}>
            <Image source={{ uri: user.avatar }} style={styles.avatar}/>
            <Text>{`Username: ${user.userName}`}</Text>
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    container: { width: '95%', height: 60, borderRadius: 10, backgroundColor: 'white', padding: 5, alignSelf: 'center' },
    firstRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
    avatar: { height: 50, width: 50, borderRadius: 10 },
});

export default UserView;
