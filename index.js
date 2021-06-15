// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://localhost/playground", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.log("Could not connect to MongoDB...", err));

// const courseSchema = new mongoose.Schema({
//   name: String,
//   author: String,
//   tags: [String],
//   date: { type: Date, default: Date.now },
//   isPublished: Boolean,
// });

// const Course = mongoose.model("course", courseSchema);

// // async function createCourse() {
// //   const course = new Course({
// //     name: "React Native Course",
// //     author: "Mosh",
// //     tags: ["React Native", "Frontend"],
// //     isPublished: true,
// //   });

// //   const result = await course.save();
// //   console.log(result);
// // }

// async function getCourses() {
//   // to implement pagination on the getCourse function
//   // const pageNumber = 2;
//   // const pageSize = 10;
//   // const pageSequence = (pageNumber - 1) * pageSize;

//   const courses = await Course.find({ author: "Mosh", isPublished: true })

//     // then to complete the pagination
//     // .skip(pageSequence)
//     // .limit(pageSize)

//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   // .count(); this is used to get the number of database that matches hte query

//   console.log(courses);
// }

// getCourses();

// createCourse();

////////////////////////////////////////////////
// excersise on video 14

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/Excercise", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const eSchema = mongoose.Schema({
  tags: {
    type: Array,
    validate: {
      // this is making a validator async

      validator: function (v) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 4000);
        });
      },
    },
  },
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["web", "email", "mobile"],
    lowercase: true,
  },
  author: String,
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
  },
});

const Courses = mongoose.model("eCourses", eSchema);

//Creating a course
async function createCourse() {
  const eCourse = new Courses({
    tags: [],
    category: " - ",
    name: "Node Course",
    author: "Mosh",
    isPublished: true,
    price: 15,
  });

  try {
    // await eCourse.validate(); // manually validating the course/ the validate method returns a bool.
    const result = eCourse.save();
    console.log(result);
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}

createCourse();

// Reading/finding  a course

// async function getCourses() {
//   return await eCourses
//     .find({ isPublished: true })
//     .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1, price: 1 });
// }

// async function displayCourses() {
//   const courses = await getCourses();
//   console.log(courses);
// }

// displayCourses();

//updating a course

//query first method..

// async function updateCourse(id) {
//   const course = await eCourses.findById(id);
//   if (!course) return;

//   course.author = "mark";
//   course.isPublished = true;
//   course.price = 60;

//   console.log(course);
// }

// updateCourse("60089171fb469a2a8c519ea7");

// the update first approach
// note the update itself is deprecated

// async function updateCourse(id) {
//   const result = await eCourses.updateOne(
//     { _id: id },
//     {
//       $set: {
//         author: "mark",
//         isPublished: false,
//       },
//     }
//   );

//   console.log(result);
// }

// this update display the file changed
// and query stirng ' { new: true }' is to makke sure it displays the new file.

// async function updateCourse(id) {
//   const result = await eCourses.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         author: "mark",
//         isPublished: false,
//       },
//     },
//     { new: true }
//   );

//   console.log(result);
// }

// updateCourse("6008330f9321df33a4b6ba91");

// async function removeCourse(id) {

//   // this just deletes the document..
//   // const result = await eCourses.deleteOne({ _id: id });
//   // console.log(result);

//   // this deletes and show the document deleted
//   //   const deletedCourse = await eCourses.findByIdAndRemove(id);
//   //   console.log(deletedCourse);
// }

// removeCourse("6008330f9321df33a4b6ba91");
