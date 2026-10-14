import React from 'react';
import { Text, View } from 'react-native';
import type { TinNhan } from '../../types';
import { dinhDangGio } from '../../utils/thoiGian';
import { styles } from './styles';
export const BongBongTinNhan = ({
  message,
  senderName,
}: {
  message: TinNhan;
  senderName?: string;
}) => {
  const outgoing = message.nguoiGuiId === 'me';
  return (
    <View
      style={[styles.bubble, outgoing ? styles.outgoing : styles.incoming]}
      accessibilityLabel={`${outgoing ? 'Bạn' : senderName || 'Tin nhận'}: ${
        message.noiDung
      }, ${dinhDangGio(message.thoiGian)}`}
      accessible
    >
      {!outgoing && !!senderName && (
        <Text style={styles.sender}>{senderName}</Text>
      )}
      <Text style={[styles.text, outgoing && styles.outgoingText]}>
        {message.noiDung}
      </Text>
      <Text style={[styles.time, outgoing && styles.outgoingText]}>
        {dinhDangGio(message.thoiGian)}
        {outgoing ? ' · Đã gửi' : ''}
      </Text>
    </View>
  );
};
