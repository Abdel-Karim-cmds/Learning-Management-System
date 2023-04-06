async function getCourse() {
    const response = await fetch("/sendCourse", { method: "GET" });
    const data = await response.json()
    // console.log(data)
    // populateCourseTable(data)
    return data
}

module.exports = {getCourse}