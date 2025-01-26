import { useContext, useEffect, useState } from "react";
import Modal from "../../component/Model";
import FeedComponent from "./FeedComponent";
import axios from "axios";
import { FEED_URL, UPLOAD_URL } from "../../config/URL";
import { ToastContainer, toast } from 'react-toastify';
import { authContext } from "./../../App";
import Loader from "react-js-loader";




export default function FeedList() {
  const auth: any = useContext(authContext)
  const [title, settitle] = useState<String | undefined>(undefined)
  const [description, setdescription] = useState<String | undefined>(undefined)
  const [url, seturl] = useState<String | undefined>(undefined)
  const [feedCreateModel, setfeedCreateModel] = useState(false)
  const [data, setdata] = useState([])
  const [loader, setloader] = useState(false)

  useEffect(() => {
    fetchFeed()
  }, [])


  async function fetchFeed() {
    try {
      let res = await axios.get(FEED_URL + `/${auth?.user?._id}`);
      if (res.data.success) (
        setdata(res.data.feed)
      )
    } catch (error) {
      console.log(error)

    }


  }

console.log("loader",loader)

  async function createFeed() {
    try {

      let payload = { title, description, url, userId: auth?.user?._id }
      let res = await axios.post(FEED_URL, payload);

      if (res.data.success) {
        toast("Feed Create Successfully")
        setfeedCreateModel(false)
        fetchFeed()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function uploadFun(file: any) {
    try {
      console.log()
      setloader((p)=>!p)

      let data = new FormData();
      data.append('file', file[0]);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: UPLOAD_URL,
        data: data
      };

      axios.request(config)
        .then((response) => {
          seturl(response?.data?.url)
          setloader(false)

          console.log(JSON.stringify(response.data));
        })
    } catch (error) {
      console.log(error)
      setloader(false)
      toast("Something Went Worng!")

    }

  }


  return (

    <div className="flex flex-col w-full" >
      <ToastContainer />

      <div className="text-center mt-5 font-bold text-3xl">
        Feed
      </div>
      <div className="flex w-full justify-end mb-10 ">
        <button
          className="flex w-50  bg-blue-400 justify-center rounded-3xl p-2 mr-2 "
          onClick={() => {
            setfeedCreateModel(true)
          }}
        >
          Add Feed
        </button>
      </div>

      {feedCreateModel && (
        <Modal
          isOpen={feedCreateModel}
          onClose={() => setfeedCreateModel(false)}
          children={
            <div className="flex  flex-1 flex-col">
              <h2 className="text-center">Add Feed </h2>
              <input placeholder="Title" className='border-2 rounded-xl flex-1 p-1 h-15 mt-5 text-center'
                onChange={(e) => {
                  settitle(e.target.value)
                }}
              />
              <input placeholder="Description" className='border-2 rounded-xl flex-1 p-1 h-15 mt-5 text-center'
                onChange={(e) => {
                  setdescription(e.target.value)
                }}
              />
              <input placeholder="File Upload" type="file" className='border-2 rounded-xl flex-1 p-1 h-15 mt-5 text-center'
                onChange={(e) => {
                  uploadFun(e.target.files)
                }}
              />
              <div className="ml-10 mr-10 flex justify-center mt-10 ">
                <button onClick={loader ? ()=>{} : createFeed} className="bg-blue-400 rounded-2xl p-3 flex-1"><p className="font-bold"> {loader ? (<Loader type="spinner-default" bgColor={"blue"} color={"white"} className="p-2" size={40} />) : "Submit"}</p></button>
              </div>

            </div>
          }
        >
        </Modal>
      )}



      <div>
        {data?.map((item) => {
          return (
            <FeedComponent item={item} />
          )
        })}
      </div>


    </div>
  )
}
