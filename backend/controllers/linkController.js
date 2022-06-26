const asyncHandler = require('express-async-handler')

const Link = require('../models/linkModel')


// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getLinks = asyncHandler(async (req, res) => {
  const links = await Link.find({ user: req.user.id })

  res.status(200).json(links)
})

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setLink = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const link = await Link.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(link)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id)

  if (!link) {
    res.status(400)
    throw new Error('Link not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (link.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedLink = await Link.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedLink)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id)

  if (!link) {
    res.status(400)
    throw new Error('Link not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (link.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await link.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getLinks,
  setLink,
  updateLink,
  deleteLink
}