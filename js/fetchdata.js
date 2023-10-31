const fetchData = async (url, headers = {}) => {
    const response = await fetch(url, { headers });
    const data = await response.json();
    //console.log("Fetched data:", data);
    return data;
}