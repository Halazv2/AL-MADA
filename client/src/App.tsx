import {useState} from "react";
import Layout from "./layouts";
import FileInput from "./components/FileInput";
function App() {
  const [file, setFile] = useState<any>(null);
  return (
    <Layout>
      <div className='w-full flex justify-center items-center'>
        <FileInput file={file} setFile={setFile} />
      </div>
    </Layout>
  );
}

export default App;
