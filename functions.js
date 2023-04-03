async function getCourse() {
    const response = await fetch("http:localhost:3000/sendCourse", { method: "GET" });
    const data = await response.json()
    // console.log(data)
    // populateCourseTable(data)
    return data
}

module.exports = {getCourse}