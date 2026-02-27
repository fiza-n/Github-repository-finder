import API from "../api/api"
import {useEffect,useState} from 'react'


const Github = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!selectedOption.trim()) return;

    const fetchData = async () => {
      try {
        const response = await API.get(
          `/search/repositories?q=${encodeURIComponent(selectedOption)}`
        );

        setData(response.data.items);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    console.log(data);

    fetchData();
  }, [selectedOption]); 
  
  return (
    <div>
        Github repository finder
        <div>
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="" disabled>
                    Select a language
                </option>
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