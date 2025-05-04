var arr = [
    ['John', 47, 46],
    ['Bob', 23, 24],
    ['Nick', 40, 30],
    ['Alex', 44, 45]
]


function calcScore() {
    for (let i = 0; i < arr.length; i++) {
        var score1 = arr[i][1]
        var score2 = arr[i][2]
        var totalScore = score1 + score2
        if (totalScore > 89) {
            var letterGrade = 'A'
        } else if (totalScore > 79) {
            letterGrade = 'B'
        } else if (totalScore > 70) {
            letterGrade = 'C'
        } else if (totalScore == 70) {
            letterGrade = 'D'
        } else {
            letterGrade = 'F'
        }
        console.log(arr[i][0] + ' got a score of ' + totalScore + ', which is a ' + letterGrade)
    }
}
calcScore()