function readSqlite(state) {

  // let alldatas = []

  readhref()
    .then((data) => {
      console.log(data)
      // data.forEach((e, i) => {
      //   let srclist = []
      //   readsrc().then((srcs) => {
      //     srcs.forEach((w, j) => {
      //       if (w.hrefId == i) {
      //         srclist.push(w)
      //       }
      //     })
      //   })
      //   e.srclist = srclist
      //   state.allHrefs.push(e)
      // })
    })

  // console.log(hrefrows)
  // hrefrows.forEach((e, i) => {
  //   let srclist = []
  //   srcrows.forEach((w, j) => {
  //     if (w.hrefId == i) {
  //       srclist.push(w)
  //     }
  //   })
  //   e.srclist = srclist
  //   alldatas.push(e)
  // });
  // state.allHrefs = alldatas
  // console.log(alldatas)
}

function readhref() {
  var sqlite3 = require('sqlite3').verbose();

  const db = new sqlite3.Database('./hreDB.sqlite')
  // return new Promise((resolve, reject) => {
  var queryhref = 'select * from hrefTable'; // left join srcTable on hrefTable.id = srcTable.hrefId
  db.all(queryhref, (err, rows) => {
    // resolve(rows)
    console.log(rows)
  })
  console.log("what's your problem???")
  // })

}

function readsrc() {
  return new Promise((resolve, reject) => {
    var querysrc = `select * from srcTable`;
    db.all(querysrc, (err, rows) => {
      resolve(rows)
    })

  })
}

export {
  readSqlite,
  readhref,
  readsrc
}
// readSqlite()
readhref()
