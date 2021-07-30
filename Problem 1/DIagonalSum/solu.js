/**
Matrix Given = [[1,2,3],
                [2,3,4],
                [3,4,5],]
 */
const matrix = [[1,2,3],[2,3,4],[3,4,5]]
const N = 3;

function diagSum(matrix,N){
    let primary =0, secondary=0;
    for (let i=0; i<N; i++){
        primary+=matrix[i][i];
        secondary+=matrix[N-i-1][i]
    }
    return primary + secondary;
}

console.log(diagSum(matrix,N))