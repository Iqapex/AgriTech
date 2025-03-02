const mongoose = require('mongoose');

const experience = new mongoose.Schema({
    companyName: String,
    startDate: Date,
    endDate: Date,
    role: String,
    description: String,
    present: Boolean,
});

const education = new mongoose.Schema({
    institute: String,
    degreeName: String,
    startDate: Date,
    endDate: Date,
    grade: String,
    course: String,
    present: Boolean,
});

const rating = new mongoose.Schema({
    userId: String,
    rating: String,
});

const connection = new mongoose.Schema({
    contactorId: String,
    seen: Boolean,
});

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 3,
        max: 15,
    },
    middlename: {
        type: String,
        default: "",
        max: 15,
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 15,
    },
    birthDate: {
        type: Date,
    },
    education: [education],
    experience: [experience],
    summary: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    wallPaper: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    emailId: {
        type: String,
        required: true,
        min: 3,
        max: 50,
        unique: true,
    },
    contacts: {
        type: Array,
        default: [],
    },
    pendingContacts: [connection],
    sentContact: {
        type: Array,
        default: [],
    },
    isLawyer: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    rating: [rating],
    geoLocation: {
        city: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: 'India',
        },
    },
    lawyerType: {
        type: String,
        default: "",
    },
    yearsOfExperience: {
        type: String,
        default: '',
    },
    noOfCases: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true // Ensure this field is always populated with a unique value
    },
    subscriptionType: String,
    subscriptionExpiry: Date,
    paymentHistory: [{
    paymentId: String,
    amount: Number,
    currency: String,
    createdAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);