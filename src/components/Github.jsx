import {useEffect,useState} from 'react'

const Github = () => {
    const [selectedOption,setSelectedOption] = useState("");
    const [data,setData] = useState([]);

    useEffect(() =>{
        
    } ,[]);

    const fetchData = async () => {
        const res = await fetch(`https://api.github.com/search/repositories?q=${selectedOption}`);
        const data = await res.json();
        setData(data.items);
        setSelectedOption("");
        console.log(data);
        }
        fetchData();

  return (
    <div>
        Github repository finder
        <div>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="Javascript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="C++">C++</option>
                <option value="Typescript">Typescript</option>
                <option value="HTML">HTML</option>
            </select>
        </div>
        </div>
  )
}

export default Github