import User from "../models/user-model.js";

export const store = async (req, res) => {
  try {
    const content = await User.create(req.body);
    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const index = async (req, res) => {
  try {
    const content = await User.find(req.query).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const show = async (req, res) => {
  try {
    const content = await User.findById(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const update = async (req, res) => {
  try {
    const content = await User.findByIdAndUpdate(
      req.params.id,
      req.body
    ).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const destroy = async (req, res) => {
  try {
    const content = await User.findByIdAndDelete(req.params.id).exec();
    res.json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const signup = async (req, res) => {
  try {
    const content = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req, res) => {
  console.log("fffffffff");
  try {

    const user = await User.findOne({
      email: req.body.email
    });

    //validando se existe o usuário cadastrado
    if(!user) {
      res.sendStatus(404).json("Usuário não encontrado");
    }

    //validadndo se a senha difgitada é a correta
    const check_password = await bcrypt.compare(req.body.password, user.password);

    
    if(!check_password) {
      res.sendStatus(401).json("Senha inválida");
    }

    // res.json();
  } catch (error) {
    res.status(400).send(error);
  }
};