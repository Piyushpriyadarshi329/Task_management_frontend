import { Droppable, Draggable } from 'react-beautiful-dnd';
import { MdDelete } from "react-icons/md";

export function TaskComponent({ pending, done,completed,updateTaskStatus }:any) {
    console.log("pending",pending)
   const getListStyle = (isDraggingOver:any) => ({
      background: isDraggingOver ? "lightblue" : "white",
      width: '21%',
   });
   const getItemStyle = (isDragging:any, draggableStyle:any) => ({
      userSelect: "none",
      background: isDragging ? "darkgrey" : "white",
      color: isDragging ? "white" : "black",
      padding: isDragging ? '0%' : '2%',
      paddingLeft: '2%',
      margin: '0%',
      fontSize: '17px',
      borderBottom: '0.5px solid gray',
      ...draggableStyle
   });
   return (
      <div style={{ width: '100%', display: 'flex' }}>
        <div className='flex flex-1'>
        <Droppable droppableId="Pending_drop_area"  >
            {(provided, snapshot) => (
               <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className='flex-1  flex-col '
               >
                     <h6 className='text-center bg-gray-200 font-bold text-xl' style={{ paddingLeft: '2%' }}>Pending</h6>
                     {pending.map((data:any, index:any) => (
                        <Draggable key={data?.title} 
                         draggableId={`${data?.title}${index}`} index={index}>
                           {(provided, snapshot) => (
                              <div
                                 key={index}
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                 )}
                                 className='border-2 rounded-s-sm mt-10'
                              >
                                <p>Title:{ data?.title}</p> 
                                <p>{ data?.description}</p> 
                                <div className='flex justify-end'>
                                <MdDelete onClick={()=>{
                                    updateTaskStatus(data?._id,"Delete")
                                }} />
                                </div>


                              </div>
                           )}
                        </Draggable>
                     ))}
                  
                 {provided.placeholder}
              </div>
           )}
        </Droppable>
        </div>
   
      <div className='flex flex-1 ml-10'>
      <Droppable droppableId="Completed_drop_area"  >
           {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className='flex-1  flex-col '

              >
                   <h6 className='text-center bg-gray-200 font-bold text-xl' style={{ paddingLeft: '2%' }}> Completed</h6>
                      {completed.map((data:any, index:any) => (
                         <Draggable key={data?.title} draggableId={`${data?.title}${index}`} index={index}>
                            {(provided, snapshot) => (
                               <div
                                  key={index}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                     snapshot.isDragging,
                                     provided.draggableProps.style
                                  )}
                                  className='border-2 rounded-s-sm mt-10'

                               >
                                <p>Title:{ data?.title}</p> 
                                <p>{ data?.description}</p> 
                                <div className='flex justify-end'>
                                <MdDelete onClick={()=>{
                                    updateTaskStatus(data?._id,"Delete")
                                }} />
                                </div>
                               </div>
                            )}
                         </Draggable>
                      ))}
                   {provided.placeholder}
                </div>
             )}
          </Droppable>
      </div>

      <div className='flex flex-1 ml-10'>
      <Droppable droppableId="DC_drop_area"  >
           {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                className='flex-1  flex-col '

              >
                   <h6  className='text-center bg-gray-200 font-bold text-xl' style={{ paddingLeft: '2%'  }}> Done</h6>
                      {done.map((data:any, index:any) => (
                         <Draggable key={data?.title} draggableId={`${data?.title}${index}`} index={index}>
                            {(provided, snapshot) => (
                               <div
                                  key={index}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                     snapshot.isDragging,
                                     provided.draggableProps.style
                                  )}
                                  className='border-2 rounded-s-sm mt-5 bg-amber-950'

                               >
                               <p>Title:{ data?.title}</p> 
                               <p>{ data?.description}</p> 
                               <div className='flex justify-end'>
                                <MdDelete onClick={()=>{
                                    updateTaskStatus(data?._id,"Delete")
                                }} />
                                </div>
                               </div>
                            )}
                         </Draggable>
                      ))}
                   {provided.placeholder}
                </div>
             )}
          </Droppable>
      </div>
       </div>
    )
}