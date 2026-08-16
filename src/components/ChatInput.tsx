import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { s, vs } from 'react-native-size-matters';
import { AppColors } from '../styles/colors';
import Feather from 'react-native-vector-icons/Feather';
import { IS_ANDROID } from '../constants/platforms';

interface ChatInputProps {
  requestMsg: string;
  setResponseMsg: (message: string) => void;
  onSentMsgPress: (message: string) => void;
}

const ChatInput = ({
  requestMsg,
  setResponseMsg,
  onSentMsgPress,
}: ChatInputProps) => {
  const senMessageHandler = () => {
    if (requestMsg.trim().length > 0) {
      onSentMsgPress(requestMsg);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={requestMsg}
        onChangeText={setResponseMsg}
        placeholder="Type a message ...."
        multiline={true}
        placeholderTextColor={AppColors.black}
      ></TextInput>
      <TouchableOpacity style={styles.sendBtn} onPress={senMessageHandler}>
        <Feather name="send" color={AppColors.white} size={16} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: s(12),
    backgroundColor: AppColors.white,
    borderTopColor: AppColors.darkGray,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: AppColors.gray,
    paddingHorizontal: s(10),
    paddingVertical: vs(10),
    borderRadius: 50,
    marginRight: 10,
  },
  sendBtn: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: AppColors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
