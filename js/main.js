let countObject = 0;

const getNumberArray = () => {
  countObject++;
  return {
    id: countObject,
    url: photos/`${countObject}`.jpg,
    description: "Фотка на память",
    comments: getRandomPositiveInteger(0, 200),
    likes: getRandomPositiveInteger(15, 200)
  };
};

const ObjectsArray = Array.from({ length: 25 }, getNumberArray);

function getRandomPositiveInteger(a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const checkStringLength = (string, length) => string.length <= length;

checkStringLength('', 140);
