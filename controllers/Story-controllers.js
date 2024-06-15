import Story from "../models/Story.js";

export const addStory = async(req, res) => {
    const { user } = req;
    const { mediaType, allowedViewers } = req.body;
    const mediaUrl = req.file.path;

    const story = new Story({
        user: user._id,
        mediaUrl,
        mediaType,
        allowedViewers: allowedViewers ? allowedViewers.split(',') : [] // Parse allowedViewers as an array
    });
    try{
        await story.save();
        return res.status(201),json({message:"Story"})
    }
    catch(error){
        return res.status(400).json({message: error.message})
    }
};

export const usersStory = async (req, res) => {
    const { user } = req;
    
    try {
      const stories = await Story.find({
        $or: [
          { user: { $in: user.following }, allowedViewers: { $exists: false } },
          { allowedViewers: user._id }
        ]
      })
  
      return res.json(stories);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};

export const viewStory = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
  
    try {
      const story = await Story.findById(id);
      if (!story.views.includes(user._id)) {
        story.views.push(user._id);
        await story.save();
      }
      if (!story.allowedViewers.includes(user._id)) {
        return res.status(403).json({ error: 'Not authorized to view this story' });
      }      
      return res.sendStatus(200);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};

export const deleteStory = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
  
    try {
      const story = await Story.findById(id);
      if (!story) {
        return res.status(404).json({ error: 'Story not found' });
      }
  
      if (story.user.toString() !== user._id.toString()) {
        return res.status(403).json({ error: 'User not authorized to delete this story' });
      }
      await story.remove();
      return res.json({ message: 'Story deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
};
