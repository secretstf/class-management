const getUsers = async () => {
  const data = await fetch(`/api/firebase/collection?id=users`, {
    method: "GET",
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    let data = await res.json();

    let dataDict = data.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    return dataDict;
  });

  return data;
};

export { getUsers };
