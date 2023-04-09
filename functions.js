async function getCourse() {
    const response = await fetch("http://localhost:3000/sendCourse");
    const data = await response.json()
    // console.log(data)
    // populateCourseTable(data)
    return data
}

function add(a, b) {
    return a + b
}

module.exports = { getCourse, add }
