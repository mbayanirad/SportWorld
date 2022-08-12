
//this function use for reciive data from backénd
export const getDataFromServer = (Endpoint) => {
    try {
      return fetch(Endpoint)
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 200) return res.data;
          else return null;
        });
    } catch (err) {
      throw window.alert(err.Message);
    }
  };
  //this function is for post, patch or upadte
  export const sentDataToServer =  (Endpoint, Method, Body = "") => {
    let success = false;
    const init = {
      method: Method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Body),
    };
    return fetch(Endpoint, init)
      .then((res) => res.json())
      .then((res) => {
        if (res.status > 300) {
          success = false;
          return false;
        //   throw window.alert(res.Message);
        } else {
          return res.data
        }
      });
  };
  