// BROWSER LOCATION

export const getBrowserLocation = async () => {
  return new Promise(function (resolve, reject) {
    // GET BROWSER LOCATION //

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 2000,
    });

    function success({ coords }) {
      resolve(coords);
    }

    function error({ message }) {
      reject(`${message}. Enable location services in your browser.`);
    }
  });
};
