import * as Yup from 'yup';

import HelpOrder from '../schemas/HelpOrder';
import Student from '../models/Student';

class StudentHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.find({
      student: req.params.id,
    }).sort({
      createdAt: 'desc',
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student is not registered' });
    }

    const helpOrder = await HelpOrder.create({
      student: req.params.id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
