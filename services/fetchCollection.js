const getCollectionData = async (collectionName) => {
    const data = await fetch(`/api/firebase/collection?id=${collectionName}`, {
        method: "GET",
    }).then(async (res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await res.json();

        // make a dictionary of the data with id as the key
        let dict = data.reduce((acc, doc) => (acc[doc.id] = doc, acc), {});

        console.log(dict);

        return data;
    });

    return data;
}

export { getCollectionData };