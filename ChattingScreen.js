import React, { Component } from 'react';
import CommonTitleBar from './CommonTitleBar.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  PixelRatio,
  StatusBar,
  FlatList,
  TouchableHighlight,
} from 'react-native';

var { width, height } = Dimensions.get('window');
const MSG_LINE_MAX_COUNT = 15;

export default class ChattingScreen extends Component {
  render() {
    var listData = [];
    var msg = '测试测试测测试测试测asdf';
    for (var i = 0; i < 20; i++) {
      var newMsg = msg;
      for (var j = 0; j < i; j++) {
        newMsg += msg;
      }
      listData.push({
        key: i,
        msg: newMsg,
        avatar: i % 2 == 0 ? require('./images/avatar.png') : require('./images/ic_common.png'),
        isSend: i % 2 == 0 ? true : false
      });
    }
    return (
      <View style={styles.container}>
        <CommonTitleBar title={"聊天"} nav={this.props.navigation} />
        <View style={styles.content}>
          <FlatList
            data={listData}
            renderItem={this.renderItem}
            />
        </View>
      </View>
    );
  }

  // 当str长度超过某个限定值时，在str中插入换行符
  spliceStr(str) {
    var len = str.length;
    if (len > MSG_LINE_MAX_COUNT) {
      var pageSize = parseInt(len / MSG_LINE_MAX_COUNT);
      var result = '';
      var start, end;
      for (var i = 0; i < pageSize; i++) {
        start = i * MSG_LINE_MAX_COUNT;
        end = start + MSG_LINE_MAX_COUNT;
        if (end > len) {
          end = len;
        }
        result += str.substring(start, end);
        result += '\n';
      }
      return result;
    } else {
      return str;
    }
  }

  renderItem = (item) => {
    var msg = this.spliceStr(item.item.msg);
    if (!item.item.isSend) {
      // 接收的消息
      return (
        <View style={listItemStyle.container} key={item.item.key}>
          <Image style={listItemStyle.avatar} source={item.item.avatar} />
          <View style={listItemStyle.msgContainer}>
            <Text style={listItemStyle.msgText}>{msg}</Text>
          </View>
        </View>
      );
    } else {
      // 发送出去的消息
      return (
        <View style={listItemStyle.containerSend} key={item.item.key}>
          <View style={listItemStyle.msgContainerSend}>
            <Text style={listItemStyle.msgText}>{msg}</Text>
          </View>
          <Image style={listItemStyle.avatar} source={item.item.avatar} />
        </View>
      );
    }
  }
}

const listItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  msgContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  msgContainerSend: {
    backgroundColor: '#9FE658',
    borderRadius: 3,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 24,
  },
  containerSend: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-end',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});
