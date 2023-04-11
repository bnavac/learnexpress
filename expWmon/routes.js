const express = require("express")
const Post = require("./models/Post")
const router = express.Router()

router.get("/posts/:id", async (req, res) => {
	try{
		const posts = await Post.findOne({_id: req.params.id})
		res.send(posts)
	} catch {
		res.status(404);
		res.send({error: "Post does not exist"})
	}
})
router.post("/posts", async(req, res) =>{
	const post = new Post({
		title:req.body.title,
		content:req.body.content,
	})
	await post.save()
	res.send(post)
})
router.patch("/posts/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })

		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
router.delete("/posts/:id", async(req, res) => {
	try{
		await Post.findOne({_id: req.params.id});
		res.status(204).send();
	} catch{
		res.status(404)
		res.send({error: "Post does not exist"})
	}
})
module.export = router
