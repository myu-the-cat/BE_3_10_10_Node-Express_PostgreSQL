const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // your solution here
  const newPost = req.body.data;
  const createdPost = await service.create(newPost);
  res.status(201).json({ data: createdPost });
}

async function update(req, res) {
  // your solution here
  const { postId } = req.params;
  const updatedPost = req.body.data;
  const updatedData = await service.update(updatedPost);
  res.json({ data: updatedData });
}

async function destroy(req, res) {
  // your solution here
    const { postId } = req.params;
  await service.delete(postId);
  res.sendStatus(204);
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
