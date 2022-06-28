import Slack from 'slack-node';
import config from 'config';
import axios from 'axios';

//TODO : 슬랙 토큰 추가
const sendSlackMessage = async () => {
  const url = 'https://slack.com/api/chat.postMessage';

  const data = {
    text: `[메디스]\n${config.NODE_ENV.toUpperCase()} 서버 배포 완료되었습니다`,
    channel: 'C031Z5SH19A',
  };

  const headers = {
    'Content-type': 'application/json; charset=utf-8',
    Authorization: `Bearer ${config.SLACK_BOT_TOKEN}`,
  };

  await axios.post(url, { ...data }, { headers });
};

sendSlackMessage();
