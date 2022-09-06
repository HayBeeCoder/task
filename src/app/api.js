import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCESS_TOKEN, BASE_URL, COMPANY_ID } from "../constants/constants";


export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", `Bearer ${ACCESS_TOKEN}`);
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `?company_id=${COMPANY_ID}`,
        method: "GET",
      }),
      providesTags: ({results}, error, arg) =>{
// console.log({results})
       return results
        ? [...results.map(({id}) => ({ type: 'Task', id })),
        // { type: 'Task', id: 'LIST' }
        "Task"
      ]
        :
        // [  { type: 'Task', id: 'LIST' }]
        ["Task"]
      }
        
    }),

    postTasks: builder.mutation({
      query: (body) => ({
        url: `?company_id=${COMPANY_ID}`,
        method: "POST",
        body,
      }),
      // invalidatesTags: [{ type: 'Task', id: "LIST" }],
      invalidatesTags: ["Task"]
      }),
      
      deleteTask: builder.mutation({
        query: (task_id) => ({
          url: `${task_id}?company_id=${COMPANY_ID}`,
          method: "DELETE",
        }),
        // invalidatesTags: [{ type: 'Task', id: 'LIST' }],
        invalidatesTags: (result, error, task_id) => [{ type: 'Task', id: task_id }],
    }),
    getTask: builder.mutation({
      query: (task_id) => ({
        url: `${task_id}?company_id=${COMPANY_ID}`,
        method: "DELETE",
      }),
    }),

    updateTask: builder.mutation({
      query: ({task_id,patch}) => ({
        url: `${task_id}?company_id=${COMPANY_ID}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags:['Task'],
      // transformResponse: (rawResult) => rawRe,
      async onQueryStarted(uniqueIdentifier, { dispatch, queryFulfilled }) {
        dispatch(api.util.resetApiState())
        // const { data }= await queryFulfilled;
        // console.log({data})//
        // console.log('lionnnnnnnnnnnnnnn')

        // Update state with new data from response
        const patchResult = dispatch(
          api.util.updateQueryData(
            'getTasks',
            undefined,
            (Tasks) => {
              return Tasks;
            }
            )
            );

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
  
            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
          
      },
      // async onQueryStarted({ task_id, ...patch }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData('getTasks', task_id, (draft) => {
      //       Object.assign(draft, patch)
      //     })
      //   )
      //   try {
      //     await queryFulfilled
      //   } catch {
      //     patchResult.undo()
      //   }
      // },  
    }),

    // getProduct: builder.query({
    //   query: (id) => ({
    //     url: `product/${id}`,
    //     method: "GET"

    //   })
    // }),
    // updateCart: builder.mutation<{ data: ICartItem[] }, {id: string,body: {auth: {_id: string} ,data:{products: ICartItem[]}}}>({
    //   query: ({id,body}) => ({

    //     url: `cart/${id}`,
    //     method: "PUT",
    //     headers:{
    //       "Access-Control-Allow-Origin":"*"
    //     },
    //     body
    //   })
    // }),
    //     getCart: builder.query<{data: {_id:string,userId: string, products: ICartItem[]},error?:string} , string>({

    //   }),
  }),
});

export const { useGetTasksQuery, usePostTasksMutation, useDeleteTaskMutation , useUpdateTaskMutation
} =
  api;
