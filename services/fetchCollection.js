const getCollectionData = async (collectionName) => {
    const data = await fetch(`/api/firebase/collection?id=${collectionName}`, {
        method: "GET",
    }).then(async (res) => {
        if (!res.ok) {
            throw new Error("Network response was not ok");
        }
        return await res.json();
    });

    return data;
}

export { getCollectionData };