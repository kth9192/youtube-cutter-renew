const hourRef = 60 * 60;
const minuteRef = 60;

export const minuteTickFormatter = (tick: number) => {
  let result;

  if (tick >= hourRef) {
    let hour = Math.floor(tick / hourRef);
    let minute = Math.floor((tick % (hourRef * hour)) / 60);
    result = `${hour}시간 ${minute}분`;
  } else if (tick >= minuteRef) {
    result = `${Math.floor(tick / 60)}분`;
  }

  // result = tick !== 0 ? `${parseInt(tick / 60)}분` : "0";
  return result;
};

export const convertSliderFormat = (time: number) => {
  let result;
  let hour = Math.floor(time / hourRef);
  let minute = Math.floor((time % hourRef) / 60);
  let second = Math.floor(time % minuteRef);

  if (time >= hourRef) {
    let hour = Math.floor(time / hourRef);
    let minute = Math.floor((time % (hourRef * hour)) / 60);
    result = `${hour}시간 ${minute}분`;
  } else if (time >= minuteRef) {
    result = `${Math.floor(time / minuteRef)}분 ${
      second >= 10 ? `${second}초` : `0${second}초`
    } `;
  } else {
    result =
      second >= 10 ? `${second}초` : second !== 0 ? `0${second}초` : `0초`;
  }

  return result;
};

export const convertIndicatorFormat = (time: number) => {
  let result;
  let hour = Math.floor(time / hourRef);
  let minute = Math.floor((time % hourRef) / 60);
  let second = Math.floor(time % minuteRef);

  if (time >= hourRef) {
    result = `${hour}:${zeroFormatter(minute)}:${zeroFormatter(second)}`;
  } else if (time >= minuteRef) {
    result = `${zeroFormatter(minute)}:${zeroFormatter(second)}`;
  } else {
    result = second;
  }

  return result;
};

const zeroFormatter = (time: number) => {
  return time > 10 ? `${time}` : `0${time}`;
};

export const generateRandomNumber = (length: number) => {
  let result = '';
  const characters = '0123456789'; // 사용할 문자셋

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};
