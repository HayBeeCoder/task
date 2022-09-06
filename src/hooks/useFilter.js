import {useMemo} from "react"
export default useFilter = (tasks) =>  {
    const filteredTasks = useMemo(
        () =>
          tasks.filter((task, index, array) => {
            if (tasks) {
              return array.indexOf(task) === index;
            }
          }),
        [tasks]
      );

      return filteredTasks
}