import { getCollectionData } from "@/services/data_request";
import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
  
    useEffect(() => {
        getCollectionData("test").then((data) => {
            setData(data);
            setLoading(false);
        }).catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
  
    return (
      <div>
        <h1>Welcome to My First Next.js Web Page!</h1>
        <p>This is a simple Next.js app.</p>
  
        <h2>Firestore Data</h2>
        {data.length === 0 ? (
          <p>No data found</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name || JSON.stringify(item)}</li>  
            ))}
          </ul>
        )}
      </div>
    );
}
